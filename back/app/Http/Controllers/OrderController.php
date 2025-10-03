<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
// use App\Models\Order;
use App\Models\Order;

use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth::check()) {
            return Auth::user()->orders()->with('product')->get();
        } else {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'required|integer|min:1',
        ]);
    
        $product = \App\Models\Product::findOrFail($request->product_id);
    
        // Create the order
        $order = Order::create([
            'user_id' => Auth::id(),
            'total'   => 0,
            'status'  => 'pending',
        ]);
    
        // Create the order item with price snapshot
        $order->items()->create([
            'product_id' => $product->id,
            'quantity'   => $request->quantity,
            'price'      => $product->price,
        ]);
    
        // Calculate total
        $total = $order->items->sum(fn($item) => $item->quantity * $item->price);
        $order->update(['total' => $total]);
    
        return response()->json($order->load('items.product'), 201);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function allOrders()
{
    // ( might add admin check here later)
    return Order::with(['user', 'items.product'])->latest()->get();
}

}



