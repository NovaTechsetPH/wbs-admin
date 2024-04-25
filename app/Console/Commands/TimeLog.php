<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\RunningApps;
use App\Models\TrackRecords;
use App\Models\Employee;

use Carbon\Carbon;

class TimeLog extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'budol:time-log';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Magic your logs';



    private function convertTimeToSecond(string $time): int
    {
        $d = explode(':', $time);
        return ($d[0] * 3600) + ($d[1] * 60) + $d[2];
    }


    /**
     * Execute the console command.
     */
    public function handle()
    {
        $ref_date = '2024-04-15';
        $members = Employee::select('id')->whereIn('team_id', [10])->get();
        $tracks = TrackRecords::whereDate('datein', '=', $ref_date)
            ->whereIn('userid', $members->pluck('id'))
            ->get();

        $this->info('Logs: ' . $tracks->count());
        foreach ($tracks as $track) {
            // $employee = Employee::find($log->userid);
            // $this->info($log->time);
            $insert = RunningApps::insert([
                'userid' => $track->userid,
                'taskid' => $track->id,
                'description' => 'Team meeting',
                'category_id' => 155,
                'date' => '2024-04-15',
                'time' => '13:30',
                'end_time' => '15:30',
                'duration' => 7200,
                'status' =>  'closed',
                'platform' => 'desktop',
                'type' => 'actual',
            ]);

            if (!$insert) {
                $this->info('Error: ' . $track->id);
            }
        }
    }
}
