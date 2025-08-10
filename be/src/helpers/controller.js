function logRequest(req) {
  console.log('Route: ', req.route.path);
}

exports.validateJoi = (schema, payload) => {
  const { error } = schema.validate(payload);
  if (error) {
    const { message, details } = error;
    return {
      value: message,
      error: { details: details.map((item) => ({ message: item.message })) },
    };
  }
}

exports.controller = async (req, res, next, { validate, exec }) => {
  try {
    logRequest(req);

    // validate
    if (validate) {
      const validation = validate(req);

      if (validation?.error) {
        throw new Error(
          'Validation failed',
          validation.error.details.map((d) => d.message),
        );
      }
    }

    // exec
    const { data = null } = await exec(req);

    res.status(200).send({ success: true, data, time: new Date() });
  } catch (err) {
    console.log('Request failed', err);
    res.status(400).send({ success: false, error: err.message, time: new Date() });
  }
}

exports.control = ({ sanitize, validate, exec }) => {
  return (req, res, next) => exports.controller(req, res, next, { validate, exec });
}