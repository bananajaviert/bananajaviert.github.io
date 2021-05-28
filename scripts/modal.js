import { SendVideoRequest as sendVideoRequest } from './email.js' //import send video function
import { SendDesignRequest as sendDesignRequest } from './email.js' //import send design function
import { sendCustomRequest } from './email.js'
import { Custom } from './email.js'
import { DesignRequest } from './email.js' //import design request class


const basicOfferBtn = document.querySelector("#basic-offer-button")
const standardOfferBtn = document.querySelector("#standard-offer-button")
const premiumOfferBtn = document.querySelector("#premium-offer-button")

const basicRequestBtn = document.querySelector("#basic-request-button")
const standardRequestBtn = document.querySelector("#standard-request-button")
const premiumRequestBtn = document.querySelector("#premium-request-button")

const modalBg = document.querySelector("#modal-bg")
const proceed = document.querySelector('#next-btn')
const cancel = document.querySelector("#cancel-btn")

const infoModal = document.querySelector('#info-modal')
const subOfferModal = document.querySelector('#subOffer-modal')
const videoModal = document.querySelector('#video-modal')



const modalEvents = () => {
  modalBg.classList.add('open');
  infoModal.classList.add('active');
  document.body.style.overflow = "hidden";
  subOfferModal.style.display = "none";

  //for displaying video
  videoModal.classList.remove('active');
}




{
proceed.addEventListener('click', () => {
  const conceptInput = document.querySelector('#conceptDesign').value;
  const designNameInput = document.querySelector('#designName').value;
  const emailInput = document.querySelector('#emailAddress').value;

  if(conceptInput == null || designNameInput == null || emailInput == null) {
    Swal.fire({
      icon: `warning`,
      title: `Error`,
      text: `You may have entered an invalid input.`
    });
  } else {
    if(conceptInput.length < 3 || designNameInput.length < 3) {
      if(conceptInput == '' || designNameInput == '') {
        Swal.fire({
          icon: `warning`,
          title: `Empty Input`,
          text: `Your input values should not be empty.`
        });
      } else {
        Swal.fire({
          icon: `warning`,
          title: `Input values should be at least 3 characters long`,
          text: `If concept or name is less than 3 characters, do this; A = Letter A`
        });
      }
    } else {
      const validateEmail = (email) => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(String(email).toLowerCase());
      }
        if(!validateEmail(emailInput)) {
          Swal.fire({
            icon: `warning`,
            title: `Invalid Gmail address`,
            text: `Please check your Gmail address`
          })
        } else {
          infoModal.classList.remove('active');
          subOfferModal.style.display = "flex";
        }
    } 
  }
})

basicRequestBtn.addEventListener('click', () => {
  modalEvents();
})

standardRequestBtn.addEventListener('click', () => {
  modalEvents();
})

premiumRequestBtn.addEventListener('click', () => {
  modalEvents();
})

modalBg.addEventListener('click', e => {
  if(e.target !== e.currentTarget) return 
  {
    videoCancelAll()
  }
})

cancel.addEventListener('click', () => {
  videoCancelAll()
})


const tshirtCheckbox = document.querySelector('#tshirtCheckbox')
const cardCheckbox = document.querySelector('#cardCheckbox')
const stickerCheckbox = document.querySelector('#stickerCheckbox')

const tshirtNumber = document.querySelector('#tshirtNumber')
const cardNumber = document.querySelector('#cardNumber')
const stickerNumber = document.querySelector('#stickerNumber')



tshirtCheckbox.addEventListener('click', () => {
  if(tshirtCheckbox.checked == false) {
    tshirtNumber.disabled = true;
  } else {
    tshirtNumber.disabled = false;
  }
})

cardCheckbox.addEventListener('click', () => {
  if(cardCheckbox.checked == false) {
    cardNumber.disabled = true;
  } else {
    cardNumber.disabled = false;
  }
})

stickerCheckbox.addEventListener('click', () => {
  if(stickerCheckbox.checked == false) {
    stickerNumber.disabled = true;
  } else {
    stickerNumber.disabled = false;
  }
})
}

class OfferNodes {
  constructor() {
    
  }
  //create nodes and show
  showOffer(nodes) {
    const newP = document.createElement("p")

    newP.classList.add("swal-p")
    newP.appendChild(nodes)

    Swal.fire({
      icon: 'info',
      title: newP
    })
  }

  showOfferNodes = (offerType) => {
    fetch('/scripts/offer.json')
    .then((response) => {
      return response.json()
    }).then((data) => {
      let dataText = ''; 
      switch (offerType) {
      case 'designBasicNode':
        dataText = data[0].text
        break
      case 'designStandardNode':
        dataText = data[1].text
        break
      case 'designPremiumNode':
        dataText = data[2].text
        break
      case 'videoStandardNode':
        dataText = data[3].text
        break
      case 'videoPremiumNode':
        dataText = data[4].text
        break
    }
    return this.showOffer(document.createTextNode(JSON.stringify(dataText)))
    }).catch((error) => {
      Swal.fire({
        icon: `warning`,
        title: `Request failed: ${error}`,
        text: `Something went wrong. Please try again later.`
      })
    })
  }
}

//design section
basicOfferBtn.addEventListener('click', (designNode)=> {
  designNode = new OfferNodes();
  designNode.showOfferNodes('designBasicNode')
})

standardOfferBtn.addEventListener('click', (designNode) => {
  designNode = new OfferNodes();
  designNode.showOfferNodes('designStandardNode')
})
premiumOfferBtn.addEventListener('click', (designNode) => {
  designNode = new OfferNodes();
  designNode.showOfferNodes('designPremiumNode')
})

const designConfirm = document.querySelector('#finish-btn')

designConfirm.addEventListener('click', () => {
  let request = new DesignRequest();
  //check if checkboxes are on
  if(tshirtCheckbox.checked == false || cardCheckbox.checked == false || stickerCheckbox.checked == false) {
    sendDesignRequest();
  } else {
    //check if checkboxes have values after checked
    if(request.secondModalValues.tshirt.quantity.length == 0 || request.secondModalValues.card.quantity.length == 0 || request.secondModalValues.sticker.quantity.length == 0 ) {
      Swal.fire({
        icon: `warning`,
        title: `Empty quantity`,
        text: `Please enter quantity if the checkbox is checked.`
      })
    } else {
      sendDesignRequest()
    };
  }
})

const secCancelModal = document.querySelector('#cancel-modal')

secCancelModal.addEventListener('click', () => {
  videoCancelAll();
})



//video section

const standardVideoOfferBtn = document.querySelector("#standard-offer-video")
const premiumVideoOfferBtn = document.querySelector("#premium-offer-video")

standardVideoOfferBtn.addEventListener('click', (videoNode) => {
  videoNode = new OfferNodes();
  videoNode.showOfferNodes('videoStandardNode')
})
premiumVideoOfferBtn.addEventListener('click', (videoNode) => {
  videoNode = new OfferNodes();
  videoNode.showOfferNodes('videoPremiumNode')
})

const standardVideoRequestBtn = document.querySelector("#standard-request-video")
const premiumVideoRequestBtn = document.querySelector("#premium-request-video")

const uploadVideo = document.querySelector('#uploadVideoButton')
const videoInput = document.querySelector('#videoInput')

const videoModalEvents = () => {
  videoModal.classList.add('active');
}

standardVideoRequestBtn.addEventListener('click', () => {
  modalEvents();
  infoModal.classList.remove('active');
  videoModalEvents();
})

premiumVideoRequestBtn.addEventListener('click', () => {
  modalEvents();
  infoModal.classList.remove('active');
  videoModalEvents();
})

uploadVideo.addEventListener('click', () => {
  videoInput.click();
})


const videoConfirm = document.querySelector('#video-confirm-btn')

videoConfirm.addEventListener('click', (emailInput) => {
  if(videoInput.files.length === 0 ){
    Swal.fire({
      icon: `warning`,
      title: `Empty file`,
      text: `Please upload a video before submitting.`
    })
  } else {
    emailInput = document.querySelector('#videoEmailAddress').value;
    if(emailInput == null || emailInput.length == '') {
    Swal.fire({
      icon: `warning`,
      title: `Enter Gmail address`,
      text: `Please enter valid Gmail address`
    })
  } else {
    const validateEmail = (email) => {
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(String(email).toLowerCase());
    }
      if(!validateEmail(emailInput)) {
        Swal.fire({
          icon: `warning`,
          title: `Invalid Gmail address`,
          text: `Please check your Gmail address`
        })
      } else {
        //email send form
        sendVideoRequest()
      }
    }
  }
})

const videoCancelBtn = document.querySelector('#video-cancel-btn')

function removeClick() {
  tshirtCheckbox.checked = false;
  cardCheckbox.checked = false;
  stickerCheckbox.checked = false;

  tshirtNumber.disabled = true;
  cardNumber.disabled = true;
  stickerNumber.disabled = true;
}

const removeValues = () => {
  document.querySelector('#videoEmailAddress').value = '';
  videoInput.value = '';
  document.querySelector('#custom-img').value = ''
  document.querySelector('#custom-video').value = ''
  document.querySelector('#remarks').value = ''
  document.querySelector('#custom-email').value = ''
  output.src = ''
}

const videoCancelAll = () => {
  Swal.fire({
    icon: `warning`,
    title: `Do you wish to exit?`,
    text: `If you exit now, all progress will be removed.`,
    confirmButtonText: `Exit`,
    confirmButtonColor: '#5b96cf',
    showCancelButton: true,
    cancelButtonText: `Cancel`,
    cancelButtonColor: '#d14f4f',
    allowOutsideClick: false
  }).then((result) => {
    if(result.isConfirmed) {
      try {
        modalBg.classList.remove('open');
        document.body.style.overflow = "auto";
        removeValues();
        removeClick();
        document.querySelector('#noVid').innerHTML = 'No file uploaded';
        document.querySelector('#conceptDesign').value = '';
        document.querySelector('#designName').value = '';
        document.querySelector('#emailAddress').value = '';
      }
      catch(error) {
        Swal.fire({
          icon: `warning`,
          title: `Request failed: ${error}`
        })
      }
    }
  })
}
videoCancelBtn.addEventListener('click', () => {
  videoCancelAll()
})



videoInput.addEventListener('change', () => {
  document.querySelector('#noVid').innerHTML = 'Uploaded 1 file';
})


//custom section
const uploadedCustomImg = document.querySelector('#custom-img')

const customImgButton = document.querySelector('#custom-img-button')
customImgButton.addEventListener('click', () => {
  uploadedCustomImg.click()
})
const output = document.querySelector('#preview-img');

uploadedCustomImg.addEventListener('change', e => {
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = () => {
      URL.revokeObjectURL(output.src) // free memory
    }
})

const uploadedCustomVideo = document.querySelector('#custom-video')
const customVideoButton = document.querySelector('#custom-video-button')

customVideoButton.addEventListener('click', () => {
  uploadedCustomVideo.click()
})


const customSubmit = document.querySelector('#custom-submit')

customSubmit.addEventListener('click', (emailInput) => {
  let custom = new Custom()
  if(custom.files.imgValue.length === 0 && custom.files.videoValue.length === 0){
    Swal.fire({
      icon: `warning`,
      title: `Empty file`,
      text: `Please upload a video before submitting.`
    })
  } else {
    emailInput = document.querySelector('#custom-email').value;
    if(emailInput == null || emailInput.length == '') {
    Swal.fire({
      icon: `warning`,
      title: `Enter Gmail address`,
      text: `Please enter valid Gmail address`
    })
  } else {
    const validateEmail = (email) => {
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(String(email).toLowerCase());
    }
      if(!validateEmail(emailInput)) {
        Swal.fire({
          icon: `warning`,
          title: `Invalid Gmail address`,
          text: `Please check your Gmail address`
        })
      } else {
        //email send form
        sendCustomRequest()
      }
    }
  }
})


export { modalBg } //export variable
export { removeValues, removeClick } //export functions