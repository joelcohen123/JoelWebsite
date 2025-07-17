import csv
import os

csv_file = os.path.join('data', 'nfl_games_2023.csv')

print("=== CSV Debug ===")
print(f"Reading: {csv_file}")

with open(csv_file, newline='', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    
    print("\n=== HEADER ===")
    print("Field names:", reader.fieldnames)
    
    print("\n=== FIRST ROW ===")
    try:
        first_row = next(reader)
        print("First row as dict:", dict(first_row))
        print("First row values:", list(first_row.values()))
        print("Number of values:", len(first_row.values()))
    except StopIteration:
        print("No data rows found")
    
    print("\n=== FIRST 3 ROWS ===")
    f.seek(0)  # Reset to beginning
    next(reader)  # Skip header
    for i, row in enumerate(reader):
        if i >= 3:
            break
        print(f"Row {i+1}:", list(row.values())) 