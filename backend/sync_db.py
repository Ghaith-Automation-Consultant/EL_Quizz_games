import os
import sys
import subprocess
import tempfile
from urllib.parse import urlparse, unquote

# PostgreSQL Binaries Path
PG_BIN_DIR = r"C:\Program Files\PostgreSQL\18\bin"
PG_DUMP = os.path.join(PG_BIN_DIR, "pg_dump.exe")
PSQL = os.path.join(PG_BIN_DIR, "psql.exe")

# Helper to parse database URL
def parse_db_url(url: str):
    try:
        # Standardize scheme if required
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql://", 1)
        parsed = urlparse(url)
        return {
            "user": parsed.username,
            "password": unquote(parsed.password) if parsed.password else "",
            "host": parsed.hostname,
            "port": parsed.port or 5432,
            "database": parsed.path.lstrip('/')
        }
    except Exception as e:
        print(f"Error parsing database URL: {e}")
        sys.exit(1)

# Helper to run system commands with PGPASSWORD env variable
def run_pg_cmd(cmd_path: str, args: list, password: str):
    env = os.environ.copy()
    env["PGPASSWORD"] = password
    
    # Construct complete command line
    command = [cmd_path] + args
    print(f"Running: {' '.join([c if '@' not in c else '***' for c in command])}")
    
    result = subprocess.run(command, env=env, capture_output=True, text=True)
    return result

def main():
    print("==================================================")
    print("        El Quizz Database Synchronizer            ")
    print("==================================================")
    
    # 1. Resolve Local Database Configuration from .env
    # Read local configs from parent directory first, then current directory
    local_env_paths = [
        os.path.join(os.path.dirname(__file__), ".env"),
        os.path.join(os.path.dirname(os.path.dirname(__file__)), "backend", ".env"),
        ".env"
    ]
    
    local_db_url = None
    for path in local_env_paths:
        if os.path.exists(path):
            with open(path, "r", encoding="utf-8") as f:
                for line in f:
                    if line.strip().startswith("DATABASE_URL="):
                        local_db_url = line.split("=", 1)[1].strip().strip("'").strip('"')
                        break
        if local_db_url:
            break
            
    if not local_db_url:
        print("DATABASE_URL not found in local configs. Falling back to local default.")
        local_db_url = "postgresql://postgres:Mogador%4075@localhost:5432/el_quizz"
        
    local_cfg = parse_db_url(local_db_url)
    
    # 2. Resolve Production Supabase Database Configuration
    supabase_db_url = "postgresql://postgres:Oumaima%2128122024@db.xdvofqooooonupulower.supabase.co:5432/postgres"
    supabase_cfg = parse_db_url(supabase_db_url)
    
    print(f"Local Database Target:      {local_cfg['user']}@{local_cfg['host']}:{local_cfg['port']}/{local_cfg['database']}")
    print(f"Supabase Production Target:  {supabase_cfg['user']}@{supabase_cfg['host']}:{supabase_cfg['port']}/{supabase_cfg['database']}")
    print("--------------------------------------------------")
    
    # 3. Parse CLI Arguments / Options
    choice = None
    confirm = None
    
    if "--pull" in sys.argv:
        choice = "1"
    elif "--push" in sys.argv:
        choice = "2"
        
    if "--yes" in sys.argv or "-y" in sys.argv:
        confirm = "yes"
        
    if not choice:
        print("Choose Synchronization Direction:")
        print("1) PULL: Production (Supabase) -> Local")
        print("2) PUSH: Local -> Production (Supabase)")
        print("3) Cancel")
        
        try:
            choice = input("Enter choice (1-3): ").strip()
        except KeyboardInterrupt:
            print("\nCancelled.")
            sys.exit(0)
            
    if choice not in ["1", "2"]:
        print("Exiting without synchronization.")
        sys.exit(0)
        
    # Setup source and destination targets
    if choice == "1":
        src = supabase_cfg
        dest = local_cfg
        direction_msg = "PULLING data from SUPABASE to LOCAL"
    else:
        src = local_cfg
        dest = supabase_cfg
        direction_msg = "PUSHING data from LOCAL to SUPABASE"
        
    print(f"\n[WARNING] You are about to perform a sync:")
    print(f"Action: {direction_msg}")
    print(f"This will overwrite the target database '{dest['database']}' on '{dest['host']}'!")
    
    if not confirm:
        try:
            confirm = input("Are you sure? Type 'yes' to proceed: ").strip().lower()
        except KeyboardInterrupt:
            print("\nCancelled.")
            sys.exit(0)
        
    if confirm != "yes":
        print("Cancelled.")
        sys.exit(0)
        
    # 3. Perform Sync
    temp_dump_file = tempfile.mktemp(suffix=".sql")
    print(f"\n[Step 1/2] Dumping source database schema and data to temporary file...")
    
    # Dump commands: we exclude supabase extension schemas if any to bypass permission limits
    dump_args = [
        "-h", src["host"],
        "-p", str(src["port"]),
        "-U", src["user"],
        "-F", "p", # Plain text SQL format
        "--no-owner",
        "--no-privileges",
        "-f", temp_dump_file,
        src["database"]
    ]
    
    dump_res = run_pg_cmd(PG_DUMP, dump_args, src["password"])
    if dump_res.returncode != 0:
        print(f"[ERROR] Error occurred during pg_dump:")
        print(dump_res.stderr)
        if os.path.exists(temp_dump_file):
            os.remove(temp_dump_file)
        sys.exit(1)
        
    print(f"[OK] Source dumped successfully to temporary file.")
    
    print(f"\n[Step 2/2] Restoring dumped schema and data to target database...")
    
    # Clean database before restore
    # For a clean restore we run a truncate or clear cascade first
    clean_sql = (
        "DROP SCHEMA public CASCADE; "
        "CREATE SCHEMA public; "
        "GRANT ALL ON SCHEMA public TO postgres; "
        "GRANT ALL ON SCHEMA public TO public;"
    )
    
    clean_args = [
        "-h", dest["host"],
        "-p", str(dest["port"]),
        "-U", dest["user"],
        "-d", dest["database"],
        "-c", clean_sql
    ]
    
    print("Clearing target schema...")
    clean_res = run_pg_cmd(PSQL, clean_args, dest["password"])
    if clean_res.returncode != 0:
        print(f"[WARNING] Warning/Error during schema clearing (will try restoring directly):")
        print(clean_res.stderr)
        
    restore_args = [
        "-h", dest["host"],
        "-p", str(dest["port"]),
        "-U", dest["user"],
        "-d", dest["database"],
        "-f", temp_dump_file
    ]
    
    restore_res = run_pg_cmd(PSQL, restore_args, dest["password"])
    
    # Clean up temp file
    if os.path.exists(temp_dump_file):
        os.remove(temp_dump_file)
        
    if restore_res.returncode != 0:
        print(f"[ERROR] Error occurred during restore/import:")
        print(restore_res.stderr)
        sys.exit(1)
        
    print("\n==================================================")
    print("[SUCCESS] Database synchronization completed successfully!")
    print("==================================================")

if __name__ == "__main__":
    main()
