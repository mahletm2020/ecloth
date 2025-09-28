<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'description',
        'color',
        'image',
    ];
    protected $casts = [
        'color' => 'array', // cast JSON to array automatically
    ];

    // A product can have many orders
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}

