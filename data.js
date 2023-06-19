class Link {
    constructor(faIcon, text, link, prefix) {
        this.faIcon = faIcon;
        this.text = text;
        this.link = link;
        if (!text) {
            this.text = link;
        }
        if (prefix) {
            if (prefix.includes('http')) {
                this.link = prefix + '://' + this.link;
            }
            else {
                this.link = prefix + ':' + this.link;
            }
        }
        else {
            this.link = null;
        }
    }
}
Link.EMAIL = 'email';
Link.PHONE = 'phone_no';
Link.LOCATION = 'location';
Link.LINKED_IN = 'linked_in';
Link.GITHUB = 'github';
Link.STACK_OVERFLOW = 'stack_overflow';
Link.HACKER_RANK = 'hacker_rank';
Link.WEBSITE = 'website';
class Skill {
    constructor(type, level, list) {
        this.type = type;
        this.level = level;
        this.list = list;
    }
}
class WorkExperience {
    constructor(profile, company, about, companyLink, techStack, startDate, endDate, location, achievements) {
        this.profile = profile;
        this.company = company;
        this.about = about;
        this.companyLink = companyLink;
        this.techStack = techStack;
        this.startDate = startDate;
        this.endDate = endDate;
        this.location = location;
        this.achievements = achievements;
    }
}
class Education {
    constructor(course, institute, startDate, endDate, location, score) {
        this.course = course;
        this.institute = institute;
        this.startDate = startDate;
        this.endDate = endDate;
        this.location = location;
        this.score = score;
    }
}
class PersonalProject {
    constructor(name, link, startDate, endDate, techStack, description, source) {
        this.name = name;
        this.link = link;
        this.startDate = startDate;
        this.endDate = endDate;
        this.techStack = techStack;
        this.description = description;
        this.siteIcon = 'fa-solid fa-arrow-up-right-from-square';
        if (source) {
            this.sourceLink = source.link;
            if (source.type === 'GITHUB') {
                this.sourceIcon = 'fa-brands fa-github';
            }
        }
    }
}
class Language {
    constructor(language, proficiencyLevel) {
        this.language = language;
        switch (proficiencyLevel) {
            case 1:
                this.proficiency = 'Elementary Proficiency';
                break;
            case 2:
                this.proficiency = 'Limited Working Proficiency';
                break;
            case 3:
                this.proficiency = 'Professional Working Proficiency';
                break;
            case 4:
                this.proficiency = 'Full Professional Proficiency';
                break;
            case 5:
                this.proficiency = 'Native or Bilingual Proficiency';
                break;
            default:
                this.proficiency = 'No Proficiency';
                break;
        }
    }
}
export default class ResumeData {
    constructor(data) {
        this.Link = Link;
        this.data = data;
        this._initBasics();
        this._initLinks();
        this._initSkills();
        this._initWorkExperiences();
        this._initEducations();
        this._initPersonalProjects();
        this._initCertificates();
        this._initAchievements();
        this._initLanguages();
    }
    _initBasics() {
        this.fullName = this.data['full_name'];
        this.currentProfile = this.data['current_profile'];
        this.pitchMessage = this.data['pitch_message'];
    }
    _initLinks() {
        this.links = [];
        this._linkObjects = {};
        let i = 0;
        const linksObject = this.data['links'];
        if (linksObject[Link.EMAIL]) {
            this._linkObjects[Link.EMAIL] = i++;
            this.links.push(new Link('fa-solid fa-envelope', linksObject[Link.EMAIL]['text'], linksObject[Link.EMAIL]['link'], 'mailto'));
        }
        if (linksObject[Link.PHONE]) {
            this._linkObjects[Link.PHONE] = i++;
            this.links.push(new Link('fa-solid fa-mobile', linksObject[Link.PHONE]['text'], linksObject[Link.PHONE]['link'], 'tel'));
        }
        if (linksObject[Link.LOCATION]) {
            this._linkObjects[Link.LOCATION] = i++;
            this.links.push(new Link('fa-solid fa-location-dot', linksObject[Link.LOCATION]['text'], linksObject[Link.LOCATION]['link']));
        }
        if (linksObject[Link.LINKED_IN]) {
            this._linkObjects[Link.LINKED_IN] = i++;
            this.links.push(new Link('fa-brands fa-linkedin', linksObject[Link.LINKED_IN]['text'], linksObject[Link.LINKED_IN]['link'], 'https'));
        }
        if (linksObject[Link.GITHUB]) {
            this._linkObjects[Link.GITHUB] = i++;
            this.links.push(new Link('fa-brands fa-github', linksObject[Link.GITHUB]['text'], linksObject[Link.GITHUB]['link'], 'https'));
        }
        if (linksObject[Link.STACK_OVERFLOW]) {
            this._linkObjects[Link.STACK_OVERFLOW] = i++;
            this.links.push(new Link('fa-brands fa-stack-overflow', linksObject[Link.STACK_OVERFLOW]['text'], linksObject[Link.STACK_OVERFLOW]['link'], 'https'));
        }
        if (linksObject[Link.HACKER_RANK]) {
            this._linkObjects[Link.HACKER_RANK] = i++;
            this.links.push(new Link('fa-brands fa-hackerrank', linksObject[Link.HACKER_RANK]['text'], linksObject[Link.HACKER_RANK]['link'], 'https'));
        }
        if (linksObject[Link.WEBSITE]) {
            this._linkObjects[Link.WEBSITE] = i++;
            this.links.push(new Link('fa-solid fa-globe', linksObject[Link.WEBSITE]['text'], linksObject[Link.WEBSITE]['link']));
        }
    }
    getLinkBy(...linkTypes) {
        const finalList = [];
        linkTypes.forEach((linkType) => {
            finalList.push(this.links[this._linkObjects[linkType]]);
        });
        return finalList;
    }
    _initSkills() {
        this.skills = [];
        const skillList = this.data['skills'];
        if (skillList && skillList instanceof Array && skillList.length) {
            skillList.forEach((skill) => {
                this.skills.push(new Skill(skill['type'], skill['level'], skill['list']));
            });
        }
    }
    _initWorkExperiences() {
        this.workExperiences = [];
        const workExperienceList = this.data['work_experiences'];
        if (workExperienceList && workExperienceList instanceof Array && workExperienceList.length) {
            workExperienceList.forEach((workExperience) => {
                this.workExperiences.push(new WorkExperience(workExperience['profile'], workExperience['company'], workExperience['about'], workExperience['company_link'], workExperience['tech_stack'], workExperience['start_date'], workExperience['end_date'], workExperience['location'], workExperience['achievements']));
            });
        }
    }
    _initEducations() {
        this.educations = [];
        const educationList = this.data['educations'];
        if (educationList && educationList instanceof Array && educationList.length) {
            educationList.forEach((education) => {
                this.educations.push(new Education(education['course'], education['institute'], education['start_date'], education['end_date'], education['location'], education['score']));
            });
        }
    }
    _initPersonalProjects() {
        this.personalProjects = [];
        const personalProjectList = this.data['personal_projects'];
        if (personalProjectList && personalProjectList instanceof Array && personalProjectList.length) {
            personalProjectList.forEach((personalProject) => {
                this.personalProjects.push(new PersonalProject(personalProject['name'], personalProject['link'], personalProject['start_date'], personalProject['end_date'], personalProject['techStack'], personalProject['description'], personalProject['source']));
            });
        }
    }
    _initCertificates() {
        this.certificates = [];
        const certificateList = this.data['certificates'];
        if (certificateList && certificateList instanceof Array && certificateList.length) {
            certificateList.forEach((certificate) => {
                this.certificates.push(certificate);
            });
        }
    }
    _initAchievements() {
        this.achievements = [];
        const achievementList = this.data['achievements'];
        if (achievementList && achievementList instanceof Array && achievementList.length) {
            achievementList.forEach((achievement) => {
                this.achievements.push(achievement);
            });
        }
    }
    _initLanguages() {
        this.languages = [];
        const languageList = this.data['languages'];
        if (languageList && languageList instanceof Array && languageList.length) {
            languageList.forEach((language) => {
                this.languages.push(new Language(language['language'], language['proficiency']));
            });
        }
    }
}
//# sourceMappingURL=data.js.map