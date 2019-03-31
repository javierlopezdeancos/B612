const app = (function() {
  const CONFIGURATION_PATH = "b612.json";
  const ME_NODE_ID = "me";
  const CONTACT_NODE_ID = "contact";

  function renderMe(member) {
    const template = `
            <figure class="me__figure">
                <img class="me__pic" src="src/images/me.png" alt=${member.name +
                  member.surname}/>
                <figcaption class="me__figcaption">
                    ${member.name} ${member.surname}
                    <span class="me__job">${member.description}</span>
                </figcaption>
            </figure>`;

    document.getElementById(`${ME_NODE_ID}`).innerHTML = template;
  }

  function renderContact(socialNetwork) {
    return `
			<li class="contact__social">
				<a href=${socialNetwork.profile}>
					<img src="src/images/social_${socialNetwork.network}.svg" alt=${
      socialNetwork.network
    } />
				</a>
			</li>`;
  }

  function renderContacts(socialNetworks) {
    let socialNetworksRendered = "";
    let template = "";

    for (
      let socialNetwork = 0;
      socialNetwork < socialNetworks.length;
      socialNetwork++
    ) {
      socialNetworksRendered += renderContact(socialNetworks[socialNetwork]);
    }

    template = `
            <ul class="contact__socials">
                ${socialNetworksRendered}
            </ul>`;

    document.getElementById(`${CONTACT_NODE_ID}`).innerHTML = template;
  }

  function render(profile) {
    renderMe(profile.personal_information);
    renderContacts(profile.personal_information.socialNetworks);
  }

  async function getAppConfiguration(configurationPath) {
    return fetch(configurationPath).then(function(response) {
      return response.json();
    });
  }

  async function getProfileFromFireBase(reference) {
    return new Promise((resolve, reject) => {
      let profile;

      reference.on("child_added", profileSnapshots => {
        profile = profileSnapshots.val();

        if (profile) {
          console.log(profile);
          resolve(profile);
        }

        reject();
      });
    });
  }

  function initializeFireBase(config) {
    firebase.initializeApp(config);
  }

  function getProfileIdReference(reference) {
    return firebase.database().ref(reference);
  }

  async function initialize() {
    const configuration = await getAppConfiguration(CONFIGURATION_PATH);
    initializeFireBase(configuration.firebase);
    const profileIdReference = getProfileIdReference(
      configuration.firebase.reference
    );
    const myProfile = await getProfileFromFireBase(profileIdReference);
    render(myProfile);
  }

  return {
    initialize: initialize
  };
})();

app.initialize();
