<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'value',
        'status',
        'creator_id',
    ];
    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }
}
