const DATA_URL = 'data-b612.wedeploy.io';
const PROFILE_END_POINT = '/profile';

let japp= (function () {

    const ME_NODE_ID = 'me';
    const CONTACT_NODE_ID = 'contact';
    let myProfile = {};

    function setMyProfile(myCurrentProfile) {
        myProfile = myCurrentProfile;
    }

    function renderMe(member) {
        const template = `
            <figure class="me__figure">
                <img class="me__pic" src="images/me.png" alt=${member.name + member.surname}/>
                <figcaption class="me__figcaption">
                    ${member.name} ${member.surname}
                    <span class="me__job">${member.description}</span>
                </figcaption>
            </figure>`;

        document.getElementById(`${ME_NODE_ID}`).innerHTML = template;
    }

    function renderContact(socialNetwork) {
        return  `
          <li class="contact__social">
            <a href=${socialNetwork.profile}>
              <img src="images/social_${socialNetwork.network}.svg" alt=${socialNetwork.network} />
            </a>
          </li>`;
    }

    function renderContacts(socialNetworks) {
        let socialNetworksRendered = '';
        let template = '';

        for (let socialNetwork = 0; socialNetwork < socialNetworks.length; socialNetwork++) {
            socialNetworksRendered += renderContact(socialNetworks[socialNetwork]);
        }

        template = `
            <ul class="contact__socials">
                ${socialNetworksRendered}
            </ul>`;

        document.getElementById(`${CONTACT_NODE_ID}`).innerHTML = template;
    }

    function render() {
        renderMe(myProfile.personal_information);
        renderContacts(myProfile.personal_information.social_networks);
    }

    function initialize() {
        return WeDeploy.data(DATA_URL)
            .get(PROFILE_END_POINT)
            .then(function(profile) {
                setMyProfile(profile[0]);
                render();
            });
    }

    return {
        initialize: initialize,
    };

})();

japp.initialize();