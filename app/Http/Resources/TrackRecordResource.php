<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TrackRecordResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'timein' => $this->timein,
            'datein' => $this->datein,
            'timebreakin' => $this->timebreakin,
            'datebreakin' => $this->datebreakin,
            'timebreakout' => $this->timebreakout,
            'datebreakout' => $this->datebreakout,
            'timeout' => $this->timeout,
            'dateout' => $this->dateout,
        ];
    }
}
