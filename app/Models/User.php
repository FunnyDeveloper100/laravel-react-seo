<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    const PROVIDER_FACEBOOK = 'facebook';
    const PROVIDER_GOOGLE = 'google';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function getDisplayNameAttribute()
    {
        if (!empty($this->fullname)) {
            return $this->fullname;
        }

        if (!empty($this->name)) {
            return $this->name;
        }

        return $this->email;
    }

    public function scopeAdmin($query)
    {
        return $query->where('is_admin', 1);
    }

    public function scopeApproved($query)
    {
        return $query->where('deleted', 0)->where('status', 1);
    }

    public function scopeExist($query)
    {
        return $query->where('deleted', 0);
    }

    public function isAdmin()
    {
        return $this->is_admin;
    }
}
