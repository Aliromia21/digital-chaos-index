export default function validateQuery(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Query validation error",
        details: error.details.map((d) => d.message),
      });
    }

    req.validatedQuery = value;
    next();
  };
}
