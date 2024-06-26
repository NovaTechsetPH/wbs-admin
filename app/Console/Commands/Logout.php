<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Employee;
use App\Models\RunningApps;
use App\Models\TrackRecords;

use Carbon\Carbon;

class Logout extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:logout';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Logout Posting';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // $date = Carbon::parse('2024-03-23');
        $date = Carbon::now()->subDay();
        $sessions = TrackRecords::where('datein', $date->toDateString())
            ->where('timeout', null)
            ->where('dateout', null)
            ->get();

        $this->info('sessions ' . $sessions->count());

        foreach ($sessions as $session) {
            $last_activity = RunningApps::where('taskid', $session->id)
                ->where('date', $date->toDateString())
                ->orderBy('id', 'DESC')
                ->first();

            if (!$last_activity) continue;

            $session->dateout = $date->toDateString();
            $session->timeout = $last_activity->end_time ?? $last_activity->time;
            $session->save();

            $employee = Employee::find($session->userid);
            if ($last_activity->end_time == null && $employee->active_status == 'Offline') {
                $last_activity->status = 'Closed';
                $last_activity->end_time = $last_activity->time;
                $last_activity->save();
            }
        }
    }
}
