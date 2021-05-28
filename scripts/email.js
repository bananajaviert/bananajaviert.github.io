import { removeValues, removeClick } from './modal.js' //import functions
import { modalBg } from './modal.js' //import variable

//send email using EmailJS
(function() {
    emailjs.init('user_L0xnblIzS1MIW5JBeNlWr');
  })();
  
class EmailValues{
  constructor() {
    this.emailParams = {
      myAccount: document.querySelector('#myAccount').value,
      userAccount: document.querySelector('#userAccount').value,
      message: document.querySelector('#message').value
    }
  }
}
const ContactSendMail = (paramsForm) => {
  const emailVal = new EmailValues()

  paramsForm = {
    my_account: emailVal.emailParams.myAccount,
    user_account: emailVal.emailParams.userAccount,
    message: emailVal.emailParams.message
  };

  emailjs.send("service_1qgy75e","template_2mgn3pj", paramsForm)
    .then(() => {
      Swal.fire({
        title: 'Email sent!',
        text: 'Thank you for reaching us.',
        icon: 'success'
      }).then((result) => {
        if(result.isConfirmed) {
          try{
            document.getElementById("userAccount").value = '';
            document.getElementById("message").value = '';
            document.body.style.overflow = "auto";
          }
          catch(error) {
            Swal.fire({
              icon: `error`,
              title: `Request failed: ${error}`
            })
            document.body.style.overflow = "auto";
          }
        }
      })
    });
}

const SendVideoRequest = (videoParams) => {
  videoParams = {
    bundle: document.querySelector('#videoInput').value,
    user_account: document.querySelector('#videoEmailAddress').value,
    my_account: `rdzv.gs@gmail.com`
  };

  emailjs.send('bundle_request', 'bundle_template', videoParams)
  .then(() => {
    Swal.fire({
      icon: `success`,
      title: `Request sent!`,
      text: `We've received your request. Please check your gmail. If you can't see the mail, kindly check spam mails. Thank you!`
    }).then((result) => {
      if(result.isConfirmed) {
        try {
          modalBg.classList.remove('open')
          removeValues()
          document.querySelector('#noVid').innerHTML = 'No file uploaded';
          document.body.style.overflow = "auto";
        }
        catch(error) {
          Swal.fire({
            icon: `warning`,
            title: `Request failed: ${error}`
          })
        }
      }
    })
  })
}

class DesignRequest {
  constructor() {
    this.firstModalValues = {
      conceptDesign: document.querySelector('#conceptDesign').value,
      designName: document.querySelector('#designName').value,
      emailAddress: document.querySelector('#emailAddress').value
    }
    //Sub-offer modal values
    this.secondModalValues = {
      tshirt: {
        checkbox: document.querySelector('#tshirtCheckbox').value,
        quantity: document.querySelector('#tshirtNumber').value
      },
      card: {
        checkbox: document.querySelector('#cardCheckbox').value,
        quantity: document.querySelector('#cardNumber').value
      },
      sticker: {
        checkbox: document.querySelector('#stickerCheckbox').value,
        quantity: document.querySelector('#stickerNumber').value
      }
    }
  }

  
}

const SendDesignRequest = (designParams) => {
  let design = new DesignRequest() //initiate new class

  designParams = {
    concept_design: design.firstModalValues.conceptDesign,
    design_name: design.firstModalValues.designName,
    user_account: design.firstModalValues.emailAddress,
    my_account: `rdzv.gs@gmail.com`,
    
    tshirt_checkbox: design.secondModalValues.tshirt.checkbox,
    tshirt_quantity: design.secondModalValues.tshirt.quantity,

    card_checkbox: design.secondModalValues.card.checkbox,
    card_quantity: design.secondModalValues.card.quantity,

    sticker_checkbox: design.secondModalValues.sticker.checkbox,
    sticker_quantity: design.secondModalValues.sticker.quantity
  };

  emailjs.send('bundle_request', 'bundle_template', designParams)
  .then(() => {
    Swal.fire({
      icon: `success`,
      title: `Request sent!`,
      text: `We've received your request. Please check your gmail. If you can't see the mail, kindly check spam mails. Thank you!`
    })
    .then((result) => {
      if(result.isConfirmed) {
        try {
          modalBg.classList.remove('open')
          removeClick()
          removeValues()
          document.querySelector('#conceptDesign').value = '';
          document.querySelector('#designName').value = '';
          document.querySelector('#emailAddress').value = '';
          document.body.style.overflow = "auto";
        }
        catch(error) {
          Swal.fire({
            icon: `warning`,
            title: `Request failed: ${error}`
          })
        }
      }
    })
  })
}

class Custom {
  constructor() {
    this.files = {
      imgValue: document.querySelector('#custom-img').value,
      videoValue: document.querySelector('#custom-video').value
    }
    this.details = {
      remarks: document.querySelector('#remarks').value,
      email: document.querySelector('#custom-email').value
    }
  }
}

const sendCustomRequest = (customParams) => {
  let custom = new Custom()//for accessing Cusom class constructors

  customParams = {
    concept_design: custom.files.imgValue,
    design_name: custom.files.videoValue,
    
    remarks: custom.details.remarks,
    user_account: custom.details.email,
    my_account: `rdzv.gs@gmail.com`
  };

  emailjs.send('bundle_request', 'bundle_template', customParams)
  .then(() => {
    Swal.fire({
      icon: `success`,
      title: `Request sent!`,
      text: `We've received your request. Please check your gmail. If you can't see the mail, kindly check spam mails. Thank you!`
    })
    .then((result) => {
      if(result.isConfirmed) {
        try {
          document.querySelector('#custom-img').value = ''
          document.querySelector('#custom-video').value = ''
          document.querySelector('#remarks').value = ''
          document.querySelector('#custom-email').value = ''
          document.querySelector('#preview-img').src = ''
          document.body.style.overflow = 'auto'
        }
        catch(error) {
          Swal.fire({
            icon: `warning`,
            title: `Request failed: ${error}`
          })
        }
      }
    })
  })
}




export { DesignRequest, EmailValues, Custom }
export { ContactSendMail, SendDesignRequest, SendVideoRequest, sendCustomRequest}// export functions