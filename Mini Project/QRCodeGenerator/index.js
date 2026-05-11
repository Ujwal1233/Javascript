function generateQRCode(){
  let website = document.getElementById('website').value
  if(website){
    let qrcodecontainer=document.getElementById('qrcode')
    qrcodecontainer.innerHTML=""
    new QRCode(qrcodecontainer,website)
    document.getElementById('qrcode-container').style.display="block"
  }
  else{
    alert("please enter a url")
  }
}