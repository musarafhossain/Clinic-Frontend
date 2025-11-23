@echo off
SET msg=Build update

IF NOT "%~1"=="" (
    SET msg=%~1
)

echo 🔄 Switching to main branch...
git checkout main

echo 📦 Pulling latest changes...
git pull origin main

echo 🔀 Switching to build branch...
git checkout build

echo 🧹 Cleaning old files from build branch...
del /Q * >nul 2>&1
for /d %%i in (*) do rmdir /S /Q "%%i" >nul 2>&1

echo 📁 Copying exported files from out...
xcopy out\* .\ /E /H /C /I /Y >nul

echo ➕ Staging files...
git add .

echo 💬 Committing changes...
git commit -m "%msg%"

echo 🚀 Pushing to build branch...
git push origin build

echo ✨ Deployment complete!
