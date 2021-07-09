const hellosign = require("hellosign-sdk")({ key: process.env.HELLOSIGN_API_KEY });

const getEmbedURL = async (github_email, github_username) => {
  let options = {


    clientId: process.env.HELLOSIGN_CLIENT_ID,
    //template_id: process.env.CLA_TEMPLATE_ID,

    title: 'Vertrag GFN',
    subject: 'Student License Agreement',
    message: 'embedded draft test',
    signers: [
      {
        email_address: github_email,
        name: github_username,
        role: process.env.SIGNER_ROLE_NAME
      }
    ],

    // custom_fields: {  //Merge fields defined in the template
    //   github_username: github_username,
    //   github_email: github_email,
    //   // value: "Enter organization name",
    //   // editor: "signers",
    //   // required: "true"

    // },
    files: ['Vertrag_Musterfrau.docx'],
    use_text_tags: 1,
    hide_text_tags: 1,
    test_mode: 1,




  };
  console.log(options)

  // 1st create an embeded signature request using a template
  // let result = hellosign.template.createEmbeddedDraft(options)
  // let response = await hellosign.signatureRequest.createEmbeddedWithTemplate(result);
  let response = await hellosign.signatureRequest.createEmbedded(options);

  let signature_id = response.signature_request.signatures[0].signature_id;


  // 2nd fetch the url to embed specific for the first (and only) signer
  let embedded_resp = await hellosign.embedded.getSignUrl(signature_id);

  return embedded_resp.embedded.sign_url;
}

module.exports = {
  getEmbedURL: getEmbedURL
};
