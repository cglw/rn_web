export class HttpUtils {
  static appendParams(url: string, params: any): string {
    if (params) {
      url = url + '?';
      Object.keys(params).forEach(
        (key) =>
          (url =
            url +
            encodeURIComponent(key) +
            '=' +
            encodeURIComponent(params[key]) +
            '&'),
      );
      return url.substring(0, url.length - 1);
    }
    return url;
  }
  static objectToFormData(body: object = {}) {
    let formData = new FormData();
    Object.keys(body).forEach((key) => {
      formData.append(key, body[key]);
    });
    return formData;
  }
  static isEmptyObject(obj) {
    return JSON.stringify(obj) == '{}';
  }
}
