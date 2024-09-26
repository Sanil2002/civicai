const regEx = {
  IpDomain:
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?|^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/,
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  number: /^[0-9]{8,14}[^0-9]*$/,
  password: /^.{4,30}$/,
  lowercase: /.*[a-z.-].*/,
  upercase: /.*[A-Z].*/,
  digit: /.*[0-9].*/,
};
export default regEx;
