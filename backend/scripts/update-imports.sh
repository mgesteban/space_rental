#!/bin/bash

# Function to add .js extension to relative imports
add_js_extension() {
    file="$1"
    # Add .js extension to relative imports that don't already have it
    sed -i.bak -E '/from.*\.js/!s/from '\''(\.\.[^'\'']+)'\''([;])/from '\''\1.js'\''\2/g' "$file"
    sed -i.bak -E '/from.*\.js/!s/from '\''(\.[^'\'']+)'\''([;])/from '\''\1.js'\''\2/g' "$file"
    rm "${file}.bak"
}

# Find all TypeScript files in src directory
find src -name "*.ts" | while read -r file; do
    echo "Processing $file..."
    add_js_extension "$file"
done

echo "Import statements updated successfully!"
