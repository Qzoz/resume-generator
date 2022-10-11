export default class TemplateType1 {
    constructor(_data) {
        this._data = _data;
        if (this._data) {
            this.pageDom = document.createElement('div');
            this.pageDom.className = 'qzoz-page';
            this._initHeader();
            this._initNav();
            this._initSkillSection();
            this._initWorkExperience();
            this._initPersonalProject();
            this._initEducaton();
            this._initAchievementsCertificate();
            this._initLanguage();
        }
    }
    getDOM() {
        return this.pageDom;
    }
    _getSectionWithHeading(sectionClass, headingText) {
        const section = document.createElement('section');
        section.className = sectionClass;
        const heading = document.createElement('h2');
        heading.className = 'qzoz-heading';
        heading.innerText = headingText;
        section.appendChild(heading);
        return section;
    }
    _initHeader() {
        const header = document.createElement('header');
        header.className = 'qzoz-profile';
        if (this._data.fullName) {
            const fullName = document.createElement('h2');
            fullName.className = 'qzoz-profile-name';
            fullName.innerText = this._data.fullName;
            header.appendChild(fullName);
        }
        if (this._data.currentProfile) {
            const currentProfile = document.createElement('h3');
            currentProfile.className = 'qzoz-profile-title';
            currentProfile.innerText = this._data.currentProfile;
            header.appendChild(currentProfile);
        }
        if (this._data.pitchMessage) {
            const pitchMessage = document.createElement('p');
            pitchMessage.className = 'qzoz-profile-pitch';
            pitchMessage.innerText = this._data.pitchMessage;
            header.appendChild(pitchMessage);
        }
        this.pageDom.appendChild(header);
    }
    _initNav() {
        if (this._data.links && this._data.links.length) {
            const nav = document.createElement('nav');
            nav.className = 'qzoz-nav';
            this._data.links.forEach((link) => {
                const alink = document.createElement('a');
                alink.className = 'qzoz-nav-link';
                if (link.link) {
                    alink.href = link.link;
                }
                const iconSpan = document.createElement('span');
                iconSpan.className = 'qzoz-nav-link-icon';
                const icon = document.createElement('i');
                icon.className = link.faIcon;
                iconSpan.appendChild(icon);
                const textSpan = document.createElement('span');
                textSpan.className = 'qzoz-nav-link-text';
                textSpan.innerText = link.text;
                alink.appendChild(iconSpan);
                alink.appendChild(textSpan);
                nav.appendChild(alink);
            });
            this.pageDom.appendChild(nav);
        }
    }
    _initSkillSection() {
        if (this._data.skills && this._data.skills.length) {
            const section = this._getSectionWithHeading('qzoz-skills', 'Skills');
            this._data.skills.forEach((skill) => {
                if (skill.list && skill.list.length) {
                    const skillListChips = document.createElement('fieldset');
                    skillListChips.className = 'qzoz-skill-chips';
                    skillListChips.setAttribute('style', `--chip-lightness-level: ${skill.level}`);
                    const skillLegend = document.createElement('legend');
                    skillLegend.innerText = skill.type;
                    skillListChips.appendChild(skillLegend);
                    skill.list.forEach((skillName) => {
                        const skillSpan = document.createElement('span');
                        skillSpan.className = 'qzoz-skill-chip';
                        skillSpan.innerText = skillName;
                        skillListChips.appendChild(skillSpan);
                    });
                    section.appendChild(skillListChips);
                }
            });
            this.pageDom.appendChild(section);
        }
    }
    _initWorkExperience() {
        if (this._data.workExperiences && this._data.workExperiences.length) {
            const section = this._getSectionWithHeading('qzoz-work-experience', 'Work Experience');
            this._data.workExperiences.forEach((workExperience) => {
                const workDiv = document.createElement('div');
                workDiv.className = 'qzoz-work';
                const title = document.createElement('h3');
                title.className = 'qzoz-work-title';
                title.innerText = workExperience.profile;
                workDiv.appendChild(title);
                const company = document.createElement('h4');
                company.className = 'qzoz-work-company';
                company.innerText = workExperience.company;
                workDiv.appendChild(company);
                const timeLocation = document.createElement('h5');
                timeLocation.className = 'qzoz-work-time-location';
                const time = document.createElement('span');
                time.innerHTML = `${workExperience.startDate} &mdash; ${workExperience.endDate}`;
                timeLocation.appendChild(time);
                const location = document.createElement('span');
                location.innerText = workExperience.location;
                timeLocation.appendChild(location);
                workDiv.appendChild(timeLocation);
                if (workExperience.about) {
                    const about = document.createElement('h4');
                    about.className = 'qzoz-work-about';
                    about.innerText = workExperience.about;
                    workDiv.appendChild(about);
                }
                if (workExperience.achievements && workExperience.achievements.length) {
                    const achievement = document.createElement('h5');
                    achievement.className = 'qzoz-work-achievement';
                    achievement.innerText = 'Achievements/Tasks';
                    workDiv.appendChild(achievement);
                    const achievementList = document.createElement('ul');
                    achievementList.className = 'qzoz-work-achievement-list';
                    workExperience.achievements.forEach((achievement) => {
                        const listItem = document.createElement('li');
                        listItem.innerHTML = achievement;
                        achievementList.appendChild(listItem);
                    });
                    workDiv.appendChild(achievementList);
                }
                section.appendChild(workDiv);
            });
            this.pageDom.appendChild(section);
        }
    }
    _initPersonalProject() {
        if (this._data.personalProjects && this._data.personalProjects.length) {
            const section = this._getSectionWithHeading('qzoz-personal-projects', 'Personal Projects');
            this._data.personalProjects.forEach((personalProject) => {
                const projectDiv = document.createElement('div');
                projectDiv.className = 'qzoz-project';
                const name = document.createElement('h3');
                name.className = 'qzoz-project-name';
                name.innerText = personalProject.name;
                projectDiv.appendChild(name);
                const time = document.createElement('h5');
                time.className = 'qzoz-project-date';
                time.innerHTML = `${personalProject.startDate} &mdash; ${personalProject.endDate}`;
                projectDiv.appendChild(time);
                if (personalProject.description && personalProject.description.length) {
                    const descriptionList = document.createElement('ul');
                    descriptionList.className = 'qzoz-project-description';
                    personalProject.description.forEach((description) => {
                        const listItem = document.createElement('li');
                        listItem.innerHTML = description;
                        descriptionList.appendChild(listItem);
                    });
                    projectDiv.appendChild(descriptionList);
                }
                section.appendChild(projectDiv);
            });
            this.pageDom.appendChild(section);
        }
    }
    _initEducaton() {
        if (this._data.educations && this._data.educations.length) {
            const section = this._getSectionWithHeading('qzoz-educations', 'Education');
            this._data.educations.forEach((education) => {
                const eduDiv = document.createElement('div');
                eduDiv.className = 'qzoz-education';
                const course = document.createElement('h3');
                course.className = 'qzoz-education-name';
                course.innerText = education.course;
                eduDiv.appendChild(course);
                const institute = document.createElement('h4');
                institute.className = 'qzoz-education-institute';
                institute.innerText = `${education.institute}, ${education.location}`;
                eduDiv.appendChild(institute);
                const timeScore = document.createElement('h5');
                timeScore.className = 'qzoz-education-time-score';
                const timeSpan = document.createElement('span');
                timeSpan.innerHTML = `${education.startDate} &mdash; ${education.endDate}`;
                timeScore.appendChild(timeSpan);
                const scoreSpan = document.createElement('span');
                scoreSpan.innerText = education.score;
                timeScore.appendChild(scoreSpan);
                eduDiv.appendChild(timeScore);
                section.appendChild(eduDiv);
            });
            this.pageDom.appendChild(section);
        }
    }
    _initAchievementsCertificate() {
        if (this._data.certificates && this._data.certificates.length) {
            const section = this._getSectionWithHeading('qzoz-achievement-certificate', 'Achievements / Certificates');
            const achievementList = document.createElement('ul');
            achievementList.className = 'qzoz-achievements';
            this._data.certificates.forEach((certificate) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = certificate;
                achievementList.appendChild(listItem);
            });
            this._data.achievements.forEach((achievement) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = achievement;
                achievementList.appendChild(listItem);
            });
            section.appendChild(achievementList);
            this.pageDom.appendChild(section);
        }
    }
    _initLanguage() {
        if (this._data.languages && this._data.languages.length) {
            const section = this._getSectionWithHeading('qzoz-languages', 'Languages');
            const languageList = document.createElement('div');
            languageList.className = 'qzoz-language-list';
            this._data.languages.forEach((language) => {
                const languageDiv = document.createElement('div');
                languageDiv.className = 'qzoz-language-item';
                const name = document.createElement('h4');
                name.className = 'qzoz-language-name';
                name.innerText = language.language;
                languageDiv.appendChild(name);
                const prof = document.createElement('h6');
                prof.className = 'qzoz-language-prof';
                prof.innerText = language.proficiency;
                languageDiv.appendChild(prof);
                languageList.appendChild(languageDiv);
            });
            section.appendChild(languageList);
            this.pageDom.appendChild(section);
        }
    }
}
//# sourceMappingURL=type_1_script.js.map