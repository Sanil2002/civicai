import regEx from "../configs/regex";

export function isSuccessCode(
  statusCode: number,
  successDigit: number = 2
): boolean {
  return String(statusCode).startsWith(String(successDigit));
}

export function formValidation(dummy: any) {
  let ObjectData: any = {};
  let valiState = true;
  let msg = "";
  dummy.forEach((node: any) => {
    let regExTest = false;
    // debugger
    if (node?.regEx) {
      let res = node.regEx;
      regExTest = !res.test(node.value);
    } else {
      if (node?.type === "password") {
        let res = regEx.password;
        regExTest = !res.test(node.value);
      } else if (node?.type === "email") {
        let res = regEx.email;
        regExTest = !res.test(node.value);
      }
    }
    if (
      node.required === true &&
      node?.value?.length < node?.minLength &&
      (node.value !== "" ||
        regExTest ||
        (Array.isArray(node.value) && node.value.length !== 0)) &&
      (!node.hidden || node.hidden === false) &&
      (!node?.disabled || node.disabled === false)
    ) {
      if (valiState) {
        msg = `Minimum ${node?.minLength} Characters Required`;
        valiState = false;
        node.error = true;
      }
    }

    if (
      node.required === true &&
      (node.value === null ||
        node.value === "" ||
        regExTest ||
        (Array.isArray(node.value) && node.value.length === 0)) &&
      (!node.hidden || node.hidden === false) &&
      (!node?.disabled || node.disabled === false)
    ) {
      if (valiState) {
        msg = msg + " " + node?.errormessage ? node.errormessage : node.title;
      }

      if (node.type === "password" && regExTest) {
        node.showHint = true;
      }
      valiState = false;
      node.error = true;
    } else {
      node.error = false;
    }

    if (node?.result?.key && Array.isArray(node.value)) {
      let val: any = [];
      node.value.forEach((n: any) => {
        if (n[node?.result.key]) {
          val.push(n[node?.result.key]);
        } else {
          val.push(n);
        }
      });
      ObjectData[node.name] = val;
    } else if (node?.result?.key && node.value[node?.result?.key]) {
      ObjectData[node.name] = node.value[node?.result?.key];
    } else if (node?.displayProps?.value && Array.isArray(node.value)) {
      let val: any = [];
      node.value.forEach((n: any) => {
        if (n[node?.displayProps?.value]) {
          val.push(n[node?.displayProps?.value]);
        } else {
          val.push(n);
        }
      });
      ObjectData[node.name] = val;
    } else if (
      node?.displayProps?.value &&
      node.value &&
      node.value[node?.displayProps?.value]
    ) {
      ObjectData[node.name] = node.value[node?.displayProps?.value];
    } else if (node.format === "object") {
      if (node.formatName in ObjectData) {
        let name = node.name;
        ObjectData[node.formatName] = {
          ...ObjectData[node.formatName],
          [name]: node.value,
        };
      } else {
        let name = node.name;
        ObjectData[node.formatName] = {
          [name]: node.value,
        };
      }
    } else {
      ObjectData[node.name] = node.value;
    }
  });
  return {
    valiState,
    msg,
    ObjectData,
    dummy,
  };
}
