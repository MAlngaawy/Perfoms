//@ts-nocheck
import axios from "axios";
import _ from "~/@lodash";
import { BASE_URL } from "~/app/configs/dataService";
import Resizer from "../utils/Resizer.js";
import { showNotification } from "@mantine/notifications";

class EventEmitter {
  constructor() {
    this.events = {};
  }

  _getEventListByName(eventName) {
    if (typeof this.events[eventName] === "undefined") {
      this.events[eventName] = new Set();
    }
    return this.events[eventName];
  }

  on(eventName, fn) {
    this._getEventListByName(eventName).add(fn);
  }

  once(eventName, fn) {
    const self = this;

    const onceFn = (...args) => {
      self.removeListener(eventName, onceFn);
      fn.apply(self, args);
    };
    this.on(eventName, onceFn);
  }

  emit(eventName, ...args) {
    this._getEventListByName(eventName).forEach(
      function (fn) {
        fn.apply(this, args);
      }.bind(this)
    );
  }

  removeListener(eventName, fn) {
    this._getEventListByName(eventName).delete(fn);
  }
}

class AppUtils {
  static filterArrayByString(mainArr, searchText) {
    if (searchText === "") {
      return mainArr;
    }
    searchText = searchText.toLowerCase();

    return mainArr.filter((itemObj) => this.searchInObj(itemObj, searchText));
  }

  static searchInObj(itemObj, searchText) {
    if (!itemObj) {
      return false;
    }
    const propArray = Object.keys(itemObj);
    for (let i = 0; i < propArray.length; i += 1) {
      const prop = propArray[i];
      const value = itemObj[prop];
      if (typeof value === "string") {
        if (this.searchInString(value, searchText)) {
          return true;
        }
      } else if (Array.isArray(value)) {
        if (this.searchInArray(value, searchText)) {
          return true;
        }
      }
      if (typeof value === "object") {
        if (this.searchInObj(value, searchText)) {
          return true;
        }
      }
    }
    return false;
  }

  static searchInArray(arr, searchText) {
    arr.forEach((value) => {
      if (typeof value === "string") {
        if (this.searchInString(value, searchText)) {
          return true;
        }
      }

      if (typeof value === "object") {
        if (this.searchInObj(value, searchText)) {
          return true;
        }
      }
      return false;
    });
    return false;
  }

  static searchInString(value, searchText) {
    return value.toLowerCase().includes(searchText);
  }

  static matchYoutubeUrl(url: string): boolean | string {
    let p =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
      return url;
    }
    return false;
  }

  static generateGUID() {
    function S4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return S4() + S4();
  }

  static toggleInArray(item, array) {
    if (array.indexOf(item) === -1) {
      array.push(item);
    } else {
      array.splice(array.indexOf(item), 1);
    }
  }

  static handleize(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/\W+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }

  static setRoutes(config, defaultAuth) {
    let routes = [...config.routes];

    routes = routes.map((route) => {
      let auth =
        config.auth || config.auth === null ? config.auth : defaultAuth || null;
      auth = route.auth || route.auth === null ? route.auth : auth;
      const settings = _.merge({}, config.settings, route.settings);

      return {
        ...route,
        settings,
        auth,
      };
    });

    return [...routes];
  }

  static async UploadS3(
    files: File[],
    setIsLoading: { loading: boolean; progress: number },
    folder: string
  ) {
    try {
      const uploadPromis = files.map((item) =>
        axios.get(
          `${BASE_URL}/upload?contentType=${item.type}&filename=${item.name}&folder=${folder}`
        )
      );
      const uploadurls = await Promise.all(uploadPromis);
      const filesPromise = uploadurls.map(({ data }, i) =>
        axios.put(data, files[i], {
          headers: {
            "Content-Type": files[i].type,
          },
          onUploadProgress: (e) => {
            setIsLoading({
              loading: true,
              progress: Math.trunc((e.loaded / e.total) * 100),
            });
          },
        })
      );
      await Promise.all(filesPromise);
      setIsLoading({
        loading: false,
        progress: 0,
      });
      return uploadurls.map(({ data }) => data.split("?")[0]);
    } catch (error) {
      setIsLoading({
        loading: false,
        progress: 0,
      });
      throw error;
    }
  }

  static generateRoutesFromConfigs(configs, defaultAuth) {
    let allRoutes = [];
    configs.forEach((config) => {
      allRoutes = [...allRoutes, ...this.setRoutes(config, defaultAuth)];
    });
    return allRoutes;
  }

  static findById(obj, id) {
    let i;
    let childObj;
    let result;

    if (id === obj.id) {
      return obj;
    }

    for (i = 0; i < Object.keys(obj).length; i += 1) {
      childObj = obj[Object.keys(obj)[i]];

      if (typeof childObj === "object") {
        result = this.findById(childObj, id);
        if (result) {
          return result;
        }
      }
    }
    return false;
  }

  static getFlatNavigation(navigationItems, flatNavigation = []) {
    for (let i = 0; i < navigationItems.length; i += 1) {
      const navItem = navigationItems[i];

      if (navItem.type === "item") {
        flatNavigation.push({
          id: navItem.id,
          title: navItem.title,
          type: navItem.type,
          icon: navItem.icon || false,
          url: navItem.url,
          auth: navItem.auth || null,
        });
      }

      if (navItem.type === "collapse" || navItem.type === "group") {
        if (navItem.children) {
          this.getFlatNavigation(navItem.children, flatNavigation);
        }
      }
    }
    return flatNavigation;
  }

  static randomMatColor(hue) {
    hue = hue || "400";
    const mainColors = [
      "red",
      "pink",
      "purple",
      "deepPurple",
      "indigo",
      "blue",
      "lightBlue",
      "cyan",
      "teal",
      "green",
      "lightGreen",
      "lime",
      "yellow",
      "amber",
      "orange",
      "deepOrange",
    ];
    const randomColor =
      mainColors[Math.floor(Math.random() * mainColors.length)];
    return colors[randomColor][hue];
  }

  static difference(object, base) {
    function changes(_object, _base) {
      return _.transform(_object, (result, value, key) => {
        if (!_.isEqual(value, _base[key])) {
          result[key] =
            _.isObject(value) && _.isObject(_base[key])
              ? changes(value, _base[key])
              : value;
        }
      });
    }

    return changes(object, base);
  }

  // static EventEmitter = EventEmitter;

  static updateNavItem(nav, id, item) {
    return nav.map((_item) => {
      if (_item.id === id) {
        return _.merge({}, _item, item);
      }

      if (_item.children) {
        return _.merge({}, _item, {
          children: this.updateNavItem(_item.children, id, item),
        });
      }

      return _.merge({}, _item);
    });
  }

  static removeNavItem(nav, id) {
    return nav
      .map((_item) => {
        if (_item.id === id) {
          return null;
        }

        if (_item.children) {
          return _.merge({}, _.omit(_item, ["children"]), {
            children: this.removeNavItem(_item.children, id),
          });
        }

        return _.merge({}, _item);
      })
      .filter((s) => s);
  }

  static prependNavItem(nav, item, parentId) {
    if (!parentId) {
      return [item, ...nav];
    }

    return nav.map((_item) => {
      if (_item.id === parentId && _item.children) {
        return {
          ..._item,
          children: [item, ..._item.children],
        };
      }

      if (_item.children) {
        return _.merge({}, _item, {
          children: this.prependNavItem(_item.children, item, parentId),
        });
      }

      return _.merge({}, _item);
    });
  }

  static appendNavItem(nav, item, parentId) {
    if (!parentId) {
      return [...nav, item];
    }

    return nav.map((_item) => {
      if (_item.id === parentId && _item.children) {
        return {
          ..._item,
          children: [..._item.children, item],
        };
      }

      if (_item.children) {
        return _.merge({}, _item, {
          children: this.appendNavItem(_item.children, item, parentId),
        });
      }

      return _.merge({}, _item);
    });
  }

  static formatDate = (date: Date | null) => {
    if (date) {
      const today = date;
      const yyyy = today.getFullYear();
      let mm: string | number = today.getMonth() + 1; // Months start at 0!
      let dd: string | number = today.getDate();

      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;

      return yyyy + "-" + mm + "-" + dd;
    }
  };

  static formatTime(timeString: string): string {
    const [hours, minutes] = timeString.split(":");
    let period = "AM";
    let formattedHours = parseInt(hours, 10);

    if (formattedHours >= 12) {
      period = "PM";
      if (formattedHours > 12) {
        formattedHours -= 12;
      }
    } else if (formattedHours === 0) {
      formattedHours = 12;
    }

    formattedHours = formattedHours.toString().padStart(2, "0");

    return `${formattedHours}:${minutes} ${period}`;
  }

  static convertDateToString(date: Date): string {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  static resizeImage = async (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        500,
        500,
        "JPEG",
        100,
        0,
        (uri: any) => {
          resolve(uri);
        },
        "file"
      );
    });

  static hasPermission(authArr, userRole) {
    if (authArr === null || authArr === undefined) {
      return true;
    }
    if (authArr.length === 0) {
      return !userRole || userRole.length === 0;
    }
    if (userRole && Array.isArray(userRole)) {
      return authArr.some((r) => userRole.indexOf(r) >= 0);
    }
    return authArr.includes(userRole);
  }

  // Convert image URL to File --- need refactor
  // static imageUrlToFile = (url: string, imageName: string): object => {
  //   return fetch(url).then(async (response) => {
  //     const blob = await response.blob();
  //     const file = new File([blob], fileName, {});
  //     // user Resize function
  //     // const test = await AppUtils.resizeImage(file);
  //     return file;
  //   });
  // };

  static filterRecursive(data, predicate) {
    return !data
      ? null
      : data.reduce((list, entry) => {
          let clone = null;
          if (predicate(entry)) {
            clone = { ...entry };
          }
          if (entry.children != null) {
            const children = this.filterRecursive(entry.children, predicate);
            if (children.length > 0) {
              clone = { ...entry, children };
            }
          }
          if (clone) {
            list.push(clone);
          }
          return list;
        }, []);
  }

  static showNotificationFun = (
    type: "Error" | "Success",
    title: string,
    message: string
  ): any => {
    if (type === "Success") {
      showNotification({
        message: message,
        color: "green",
        title: title,
        styles: {
          root: {
            backgroundColor: "#27AE60",
            borderColor: "#27AE60",
            "&::before": { backgroundColor: "#fff" },
          },

          title: { color: "#fff" },
          description: { color: "#fff" },
          closeButton: {
            color: "#fff",
          },
        },
      });
    } else if (type === "Error") {
      showNotification({
        message: message,
        color: "red",
        title: title,
        styles: {
          root: {
            backgroundColor: "#EB5757",
            borderColor: "#EB5757",
            "&::before": { backgroundColor: "#fff" },
          },

          title: { color: "#fff" },
          description: { color: "#fff" },
          closeButton: {
            color: "#fff",
          },
        },
      });
    }
  };
}

export const eventInstance = new EventEmitter();
export default AppUtils;
