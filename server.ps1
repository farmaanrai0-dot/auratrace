# Simple PowerShell HTTP Server
$port = 8000
$url = "http://localhost:$port/"

# Create HTTP Listener
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url)
$listener.Start()

Write-Host "Server listening on $url"
Write-Host "Press Ctrl+C to stop"

# Start browser
Start-Process $url

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    $path = $request.Url.LocalPath
    if ($path -eq "/" -or $path -eq "") { $path = "/index.html" }
    
    $filePath = "C:\Users\Shadow\AuraTrace$path"
    
    if (Test-Path $filePath -PathType Leaf) {
        $content = [System.IO.File]::ReadAllBytes($filePath)
        $response.ContentLength64 = $content.Length
        
        # Set content type
        if ($filePath.EndsWith(".html")) { $response.ContentType = "text/html" }
        elseif ($filePath.EndsWith(".js")) { $response.ContentType = "application/javascript" }
        elseif ($filePath.EndsWith(".css")) { $response.ContentType = "text/css" }
        elseif ($filePath.EndsWith(".json")) { $response.ContentType = "application/json" }
        elseif ($filePath.EndsWith(".png")) { $response.ContentType = "image/png" }
        elseif ($filePath.EndsWith(".jpg") -or $filePath.EndsWith(".jpeg")) { $response.ContentType = "image/jpeg" }
        else { $response.ContentType = "text/plain" }
        
        $response.OutputStream.Write($content, 0, $content.Length)
    } else {
        $response.StatusCode = 404
    }
    
    $response.OutputStream.Close()
}
