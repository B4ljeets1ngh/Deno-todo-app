export function validateTodo(data: any): object {
  if (!data.title) {
    return {
      missingField: "title",
      error: true,
    };
  }
  if (!data.description) {
    return {
      missingField: "Description",
      error: true,
    };
  }
  if (!data.status) {
    return {
      missingField: "Status",
      error: true,
    };
  }
  return {
    missingField: "none",
    error: false,
  };
}
