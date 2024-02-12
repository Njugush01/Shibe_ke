<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ListingResourceAdminDashboard extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this -> id,
            'title' => $this -> title,
            'description' => $this -> description,
            'quantity' => $this ->quantity,
            'expiry_date' => $this -> expiry_date,
            'location' => $this -> location,
            'created_at' => $this -> created_at->format('d-m-y H:i:s'),
        ];
    }
}