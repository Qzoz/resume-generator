export default class TemplateType2 {
    constructor(_data) {
        this._data = _data;
        if (this._data) {
            this.pageDom = document.createElement('div');
            this.pageDom.className = 'qzoz-page';
            this._initHeader();
            this._initNav();
            this._generateSplittedSections();
            this._initEducaton();
            this._initSideNavLinks();
            this._initSkillSection();
            this._initWorkExperience();
            this._initPersonalProject();
            this._initCertificate();
            this._initAchievement();
            this._initLanguage();
        }
    }
    getDOM() {
        return this.pageDom;
    }
    _generateSplittedSections() {
        const splittedSections = document.createElement('div');
        splittedSections.className = 'splitted-sections';
        const leftSection = document.createElement('div');
        leftSection.className = 'left';
        splittedSections.appendChild(leftSection);
        const rightSection = document.createElement('div');
        rightSection.className = 'right';
        splittedSections.appendChild(rightSection);
        this.pageDom.appendChild(splittedSections);
        this.leftSection = leftSection;
        this.rightSection = rightSection;
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
            const fullName = document.createElement('h1');
            fullName.className = 'qzoz-profile-name';
            fullName.innerText = this._data.fullName;
            header.appendChild(fullName);
        }
        this.pageDom.appendChild(header);
    }
    _initNav() {
        if (this._data.links && this._data.links.length) {
            const nav = document.createElement('nav');
            nav.className = 'qzoz-nav';
            this._data.getLinkBy(this._data.Link.EMAIL, this._data.Link.PHONE).forEach((link) => {
                const alink = document.createElement('a');
                alink.className = 'qzoz-nav-link';
                if (link.link) {
                    alink.href = link.link;
                    alink.target = '_blank';
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
    _initSideNavLinks() {
        if (this._data.links && this._data.links.length) {
            const section = this._getSectionWithHeading('qzoz-link-side', 'Links');
            this._data.getLinkBy(this._data.Link.GITHUB, this._data.Link.LINKED_IN, this._data.Link.HACKER_RANK).forEach((link) => {
                const alink = document.createElement('a');
                alink.className = 'qzoz-nav-link';
                if (link.link) {
                    alink.href = link.link;
                    alink.target = '_blank';
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
                section.appendChild(alink);
            });
            this.leftSection.appendChild(section);
        }
    }
    _initSkillSection() {
        if (this._data.skills && this._data.skills.length) {
            const section = this._getSectionWithHeading('qzoz-skills', 'Skills');
            this._data.skills.forEach((skill) => {
                if (skill.list && skill.list.length) {
                    const skillListChips = document.createElement('fieldset');
                    skillListChips.className = 'qzoz-skill-chips';
                    const skillLegend = document.createElement('legend');
                    skillLegend.innerText = skill.type;
                    skillListChips.appendChild(skillLegend);
                    const skillList = document.createElement('ul');
                    skill.list.forEach((skillName) => {
                        const skillSpan = document.createElement('li');
                        skillSpan.className = 'qzoz-skill-chip';
                        skillSpan.innerText = skillName;
                        skillList.appendChild(skillSpan);
                    });
                    skillListChips.appendChild(skillList);
                    section.appendChild(skillListChips);
                }
            });
            this.leftSection.appendChild(section);
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
                if (workExperience.companyLink) {
                    const site = document.createElement('a');
                    site.className = 'link';
                    site.target = '_blank';
                    site.href = workExperience.companyLink;
                    site.innerHTML = `<i class="fa-solid fa-arrow-up-right-from-square"></i>`;
                    company.appendChild(site);
                }
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
            this.rightSection.appendChild(section);
        }
    }
    _initPersonalProject() {
        if (this._data.personalProjects && this._data.personalProjects.length) {
            const section = this._getSectionWithHeading('qzoz-personal-projects', 'Personal Projects');
            this._data.personalProjects.forEach((personalProject) => {
                var _a;
                const projectDiv = document.createElement('div');
                projectDiv.className = 'qzoz-project';
                const name = document.createElement('h3');
                name.className = 'qzoz-project-name';
                name.innerText = personalProject.name;
                if (personalProject.link) {
                    const site = document.createElement('a');
                    site.className = 'link';
                    site.target = '_blank';
                    site.href = personalProject.link;
                    site.innerHTML = `<i class="${personalProject.siteIcon}"></i>`;
                    name.appendChild(site);
                }
                if (personalProject.sourceLink) {
                    const site = document.createElement('a');
                    site.className = 'link right-icon';
                    site.target = '_blank';
                    site.href = personalProject.sourceLink;
                    site.innerHTML = `<i class="${(_a = personalProject.sourceIcon) !== null && _a !== void 0 ? _a : 'fa-solid fa-code'}"></i>`;
                    name.appendChild(site);
                }
                projectDiv.appendChild(name);
                if (personalProject.startDate && personalProject.endDate) {
                    const time = document.createElement('h5');
                    time.className = 'qzoz-project-date';
                    time.innerHTML = `${personalProject.startDate} &mdash; ${personalProject.endDate}`;
                    projectDiv.appendChild(time);
                }
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
            this.rightSection.appendChild(section);
        }
    }
    _initEducaton() {
        if (this._data.educations && this._data.educations.length) {
            const section = this._getSectionWithHeading('qzoz-educations', 'Education');
            this._data.educations.forEach((education) => {
                const eduDiv = document.createElement('div');
                eduDiv.className = 'qzoz-education';
                const course = document.createElement('h4');
                course.className = 'qzoz-education-name';
                course.innerText = education.course;
                eduDiv.appendChild(course);
                const institute = document.createElement('h5');
                institute.className = 'qzoz-education-institute';
                institute.innerText = `${education.institute}, ${education.location}`;
                eduDiv.appendChild(institute);
                const timeScore = document.createElement('h6');
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
            this.leftSection.appendChild(section);
        }
    }
    _initCertificate() {
        if (this._data.certificates && this._data.certificates.length) {
            const section = this._getSectionWithHeading('qzoz-achievement-certificate', 'Certificates');
            const certificateList = document.createElement('ul');
            certificateList.className = 'qzoz-achievements';
            this._data.certificates.forEach((certificate) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = certificate;
                certificateList.appendChild(listItem);
            });
            section.appendChild(certificateList);
            this.rightSection.appendChild(section);
        }
    }
    _initAchievement() {
        if (this._data.achievements && this._data.achievements.length) {
            const section = this._getSectionWithHeading('qzoz-achievement-certificate', 'Achievements');
            const achievementList = document.createElement('ul');
            achievementList.className = 'qzoz-achievements';
            this._data.achievements.forEach((achievement) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = achievement;
                achievementList.appendChild(listItem);
            });
            section.appendChild(achievementList);
            this.rightSection.appendChild(section);
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
            this.leftSection.appendChild(section);
        }
    }
}
//# sourceMappingURL=type_2_script.js.map