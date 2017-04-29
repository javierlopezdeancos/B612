const DATA_URL = 'data.javierlopezdeancos.wedeploy.me';
const PROFILES_END_POINT = '/profile';

let japp= (function () {

    const ME_NODE_ID = 'me';
    const CONTACT_NODE_ID = 'contact';

    function renderMe(member) {
        const template = `
            <figure class="me_figure">
                <img class="me_pic" src="images/me.png" alt=${member.name + member.surname}/>
                <figcaption class="me_figcaption">${member.name  + member.surname}
                    <span class="me_job">${member.description}</span>
                </figcaption>
            </figure>`;

        mydom(`#${ME_NODE_ID}`).render(template);
    }

    function renderContact(contact) {
        return  `
          <li class="contact_social">
            <a href=${contact.social_networks.profile}>
              <img src="images/social_${contact.social_networks.network}.svg" alt=${contact.social_networks.network} />
            </a>
          </li>`;
    }

    function renderContact(contacts) {
        let contactsRendered = '';
        let template = '';

        for (let contact; contact <= contacts.length; contact++) {
            contactsRendered += renderContact(contacts[contact]);
        }

        template = `
            <ul class="contact_socials">
                ${contactsRendered}
            </ul>`;

        mydom(`#${CONTACT_NODE_ID}`).render(template);
    }

    function render(profile) {
        renderMe();
        renderContact();
    }

    function initialize() {
        return WeDeploy.data(DATA_URL)
            .get(PROFILE_END_POINT)
            .then(function(profile) {
                render(profile);
            });
    }

    return {
        initialize: initialize,
    };

})();

japp.initialize();