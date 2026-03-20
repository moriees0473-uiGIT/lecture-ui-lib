$timestamp = Get-Date -Format "yyyy/MM/dd HH:mm"
git add .
git commit -m "package up $timestamp"
git push origin git main
