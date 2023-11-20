<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RunningAppsResource extends JsonResource
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
            'task_name' => $this->task_name,
            'category_id' => $this->category_id,
            'taskid' => $this->taskid,
            'userid' => $this->userid,
            'date' => $this->date,
            'time' => $this->time,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
