<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // List all products
    public function index()
    {
        return response()->json(Product::all());
    }

    // Show single product
    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }

    // Add new product (admin only)
    public function store(Request $request)
    {
        $request->validate([
            'name'  => 'required|string|max:255',
            'price' => 'required|numeric',
        ]);

        $product = Product::create([
            'name'        => $request->name,
            'price'       => $request->price,
            'description' => $request->description ?? '',
        ]);

        return response()->json($product, 201);
    }

    // Update product (admin only)
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $product->update($request->only(['name', 'price', 'description']));

        return response()->json($product);
    }

    // Delete product (admin only)
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Product deleted']);
    }
}
