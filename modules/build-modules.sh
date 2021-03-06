#!/bin/bash

# Build all local modules and copy to packages

modulesNames="shared"

# Build module function
build() {
  cd $1
  yarn
  yarn build
  cd ..
}

# Exclude old package, and create a new
if [ -d ../packages/$packageName ]; then rm -rf ../packages/$packageName; fi
mkdir "../packages"

for module in $modulesNames; do
  # build modules list
  build $module

  src="$module"
  target="../packages/$module"

  # # Remove old module
  # rm -rf ../packages/$module

  cp -r $src/dist $target
  cp -r $src/types $target
  cp $src/package.json $target
done
