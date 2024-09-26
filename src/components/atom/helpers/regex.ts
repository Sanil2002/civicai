const regEx = {
    IpDomain: /^(?:(?:https?:\/\/)?(?:www\.)?)?[a-z0-9]+(?:[-.][a-z0-9]+)*\.[a-z]{2,5}(?::\d{1,5})?(?:\/.*)?$|^(?:(?:[0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2})$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    number: /^[0-9]{8,14}[^0-9]*$/,
    password: /^(?=.*\d)(?=.*[!@#$%^&-~*])(?=.*[a-z])(?=.*[A-Z]).{8,30}$/,
    lowercase: /.*[a-z.-].*/,
    upercase: /.*[A-Z].*/,
    digit: /.*[0-9].*/,
    extension: /^\d{4}$/,
    macAddress: /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/
};
export default regEx;