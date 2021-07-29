module.exports = mongoose => {
  var invoiceSchema = mongoose.Schema(
    {
      customerId: String,
      invoiceId: String
    },
    { timestamps: true }
  );

  invoiceSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Invoice = mongoose.model("invoice", invoiceSchema);
  return Invoice;
};
