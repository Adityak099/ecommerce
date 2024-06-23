export default function MissingFields(requiredFields) {
  const missingFields = {};
  Object.entries(requiredFields).forEach(([key, value]) => {
    if (!value) {
      missingFields[key] = `${key} is required`;
    }
  });
  return missingFields;
}
