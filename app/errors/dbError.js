class DbError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export default DbError;
