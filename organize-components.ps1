# Tạo thư mục và di chuyển các components còn lại
 = @('Contact', 'Education', 'EmailTest', 'Footer', 'Hero3DScene', 'Navbar', 'Prizes')

foreach ( in ) {
    # Tạo thư mục
    New-Item -ItemType Directory -Path "src/components/" -Force | Out-Null
    
    # Di chuyển file .js vào folder và đổi tên thành Component.js
    if (Test-Path "src/components/.js") {
        Copy-Item "src/components/.js" "src/components//.js"
        
        # Tạo index.js
        "export { default } from './';" | Out-File "src/components//index.js" -Encoding UTF8
        
        # Tạo Component.scss cơ bản
        "@import '../../styles/variables';
@import '../../styles/mixins';

//  styles" | Out-File "src/components//.scss" -Encoding UTF8
        
        Write-Host "Processed  component"
    }
}
