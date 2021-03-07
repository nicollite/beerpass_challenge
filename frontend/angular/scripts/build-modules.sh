initialPath=$(pwd)
cd ../../modules
bash build-modules.sh
cd $initialPath
yarn upgrade shared
