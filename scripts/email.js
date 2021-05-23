import { removeValues, removeClick } from './modal.js' //import functions
import { modalBg } from './modal.js' //import variable

//send email using EmailJS
(function() {
    emailjs.init('user_L0xnblIzS1MIW5JBeNlWr');
  })();
  
const ContactSendMail = () => {
  const sendMail = document.getElementById("sendMail");

  sendMail.addEventListener('click', (paramsForm) => {
    paramsForm = {
      my_account: document.getElementById("myAccount").value,
      user_account: document.getElementById("userAccount").value,
      message: document.getElementById("message").value
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
  })
}

const SendVideoRequest = (videoParams) => {
  videoParams = {
    bundle: document.querySelector('#videoInput').value,
    user_account: document.querySelector('#videoEmailAddress').value,
    my_account: `mrcnbng@gmail.com`
  };

  emailjs.send('service_video_request', 'bundle_template', videoParams)
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

class designRequest {
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
  let design = new designRequest();//initiate new class

  designParams = {
    concept_design: design.firstModalValues.conceptDesign,
    design_name: design.firstModalValues.designName,
    user_account: design.firstModalValues.emailAddress,
    my_account: `mrcnbng@gmail.com`,
    
    tshirt_checkbox: design.secondModalValues.tshirt.checkbox,
    tshirt_quantity: design.secondModalValues.tshirt.quantity,

    card_checkbox: design.secondModalValues.card.checkbox,
    card_quantity: design.secondModalValues.card.quantity,

    sticker_checkbox: design.secondModalValues.sticker.checkbox,
    sticker_quantity: design.secondModalValues.sticker.quantity
  };

  emailjs.send('service_video_request', 'bundle_template', designParams)
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





export { designRequest }
export { ContactSendMail, SendDesignRequest, SendVideoRequest }// export functions