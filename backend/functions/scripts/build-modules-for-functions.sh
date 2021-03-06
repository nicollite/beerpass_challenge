functionsPath=$(pwd)

cd ../../modules
bash build-modules.sh
cd $functionsPath

# Remove the local packages
if [ -d ./packages ]; then rm -rf ./packages; fi

cp -r ../../packages .
