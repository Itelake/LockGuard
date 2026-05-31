#!/bin/bash
# LockGuard release process

set -e

trap ctrl_c INT

function ctrl_c() {
        echo -e "\nWARNING: You may have to revert the last commit depending on where you exited the release process.";
        exit;
}

echo "Version increment?"
echo "  1) Major"
echo "  2) Minor"
echo "  3) Patch"
echo "  4) None! Version bumped already."

bump=""

read -r n
case $n in
  1) bump="major";;
  2) bump="minor";;
  3) bump="patch";;
  4) bump="NONE";;
  *) echo "Invalid option"; exit;;
esac

curr_version=$(node -p "require('./package.json').version")
echo "Current version: ${curr_version}"

if [ "$bump" == "NONE" ]; then
  echo "Skipping version bump."
else
  echo "Bumping version..."
  npm version "$bump"
fi

new_version=$(node -p "require('./package.json').version")
echo "Publishing version: ${new_version}"

read -r -p "Continue (y/N)?" choice
case "$choice" in
  y|Y ) echo "yes";;
  n|N|* ) echo "Revert last commit!" && exit;;
esac

if [ "$bump" != "NONE" ]; then
  git commit --amend -m "Version bump to v$new_version"
  git push
fi

# Build electron app for Linux, Windows and macOS
export NODE_OPTIONS=--openssl-legacy-provider
npm run build && npm run dist

# Push new releases to GitHub
gh release create "v${new_version}" \
  "dist/LockGuard Setup ${new_version}.exe" \
  "dist/LockGuard-${new_version}.dmg" \
  "dist/lockguard_${new_version}_amd64.deb" \
  --title "LockGuard v${new_version}" \
  --notes "LockGuard v${new_version}"