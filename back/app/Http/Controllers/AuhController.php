<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


class AuhController extends Controller
{
    public function register(Request $request){

        
            $request->validate([
                'name' => 'required|string',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:6',
            ]);
    
            // check if first user
            $role = User::count() === 0 ? 'admin' : 'user';
    
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $role,
            ]);
    
            $token = $user->createToken('auth_token')->plainTextToken;
    
            return response()->json([
                'user' => $user,
                'token' => $token,
            ]);
        }
    
        public function login(Request $request)
        {
            if (!Auth::attempt($request->only('email', 'password'))) {
                return response()->json(['message' => 'Invalid login details'], 401);
            }
    
            $user = User::where('email', $request->email)->firstOrFail();
    
            $token = $user->createToken('auth_token')->plainTextToken;
    
            return response()->json([
                'user' => $user,
                'token' => $token,
            ]);
        }
    
        public function logout(Request $request)
        {
            $request->user()->tokens()->delete();
    
            return response()->json(['message' => 'Logged out']);
        }
    }

