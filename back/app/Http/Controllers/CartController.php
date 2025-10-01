<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{ 
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'required|integer|min:1',
        ]);
    
        $item = CartItem::where('user_id', $request->user()->id)
            ->where('product_id', $request->product_id)
            ->first();
    
        if ($item) {
            $item->quantity += $request->quantity;
            $item->save();
        } else {
            $item = CartItem::create([
                'user_id' => $request->user()->id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
            ]);
        }
    
        return response()->json($item->load('product'), 201);
    }
    

    // Get user cart
    public function index(Request $request)
    {
        return response()->json(
            $request->user()->cartItems()->with('product')->get()
        );
    }

    // Remove from cart
    public function destroy(Request $request, $id)
    {
        $item = CartItem::where('user_id', $request->user()->id)->findOrFail($id);
        $item->delete();
        return response()->json(['message' => 'Removed from cart']);
    }
}
