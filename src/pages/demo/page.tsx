import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useProduct } from "@/contexts/product-context.context";
import { useState } from "react";



const emptyForm = {
  id: 0,
  name: "",
  price: 0,
  image: "",
};

const DemoPage = () => {
  const navigate = useNavigate();
  const { products, onDelete, onAdd, onEdit } = useProduct();

  const [form, setForm] = useState(emptyForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.name;
    const value = e.target.value;

    if (input === "price") {
      setForm((prev) => ({ ...prev, price: Number(value) }));
    } else if (input === "name") {
      setForm((prev) => ({ ...prev, name: value }));
    } else if (input === "image") {
      setForm((prev) => ({ ...prev, image: value }));
    }
  };

  const handleSubmit = () => {
    if (form.name && form.price && form.image) {
      if (form.id === 0) {
        // Add
        const {...all } = form;
        onAdd(all);
      } else {
        // Edit
        onEdit(form, form.id);
      }
      setForm(emptyForm);
    }
  };

  return (
    <div className="p-10 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">
        {form.id === 0 ? "Add" : "Edit"} Product
      </h1>

      <div className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <Button onClick={handleSubmit}>
          {form.id === 0 ? "Add Product" : "Update Product"}
        </Button>
      </div>

      <hr className="my-6" />
      {products.map((product) => (
        <div
          key={product.id}
          className="flex justify-between gap-2 border border-gray-300 p-4"
        >
          <div onClick={() => navigate(`/demo/detail/${product.id}`)}>
            <h1 className="font-semibold">{product.name}</h1>
            <p>{product.price} VND</p>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => setForm(product)}>Edit</Button>
            <Button onClick={() => onDelete(product.id)}>Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DemoPage;
