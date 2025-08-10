/**
 * @class Container
 */
class Container {

  /**
   * @param {Object} data - intialize with this data
   */
  constructor(data) {
    this.data = Object.assign({}, data);
    this.IOC = Container;
  }


  /**
   * It won't rewrite if the key already exists, use update
   *
   * @param {string} key - name of the key
   * @param {*} value - anything
   *
   * @throws {TypeError} when property is already present
   */
  add(key, value) {
    if (this.data[key] !== undefined) {
      throw new TypeError(`Won't add <${key}>, already existing`);
    }
    Object.assign(this.data, {
      [key]: value,
    });
  }


  /**
   * Get value at key property
   *
   * @param {string} key - property to get
   * @param {boolean} silent - whether to throw error if property not defined
   *
   * @return {*} whatever stored at the key property
   * @throws {ReferenceError} when the silent flag is false and the property is not found
   */
  get(key, silent = false) {
    const value = this.data[key];
    if (silent === false && value === undefined) {
      throw new ReferenceError(`No key <${key}> found`);
    }
    return value;
  }


  /**
   * Will not check if property already exist, will add or set it anyway
   *
   * @param {string} key - name of the key
   * @param {*} value - anything
   */
  set(key, value) {
    Object.assign(this.data, {
      [key]: value,
    });
  }

  /**
   * Unpack, just expose the data object, so that we can use desctructing
   *
   * @return {Object} the whole data
   */
  unpack() {
    return this.data;
  }
}

module.exports = new Container();