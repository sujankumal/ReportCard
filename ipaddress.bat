@echo off
:: to know current ipv4
set ip_address_string="IPv4 Address"
:: Uncomment the following line when using older versions of Windows without IPv6 support (by removing "rem")
:: set ip_address_string="IP Address"
for /f "usebackq tokens=2 delims=:" %%f in (`ipconfig ^| findstr /c:%ip_address_string%`) do set IP=%%f
echo "Server %IP%"
pause
