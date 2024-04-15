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
        $ref_date = '2024-04-11';
        $track = TrackRecords::whereDate('datein', '=', $ref_date)
            ->where('userid', 20)
            ->first();

        $logs = RunningApps::where('taskid', $track->id)
            ->whereBetween('time', ['20:40:00', '22:30:00'])
            ->get();

        $this->info('Logs: ' . $logs->count());
        foreach ($logs as $log) {
            // $employee = Employee::find($log->userid);
            // $this->info($log->time);
            $insert = RunningApps::insert([
                'userid' => 20,
                'taskid' => 3332,
                'description' => $log->description,
                'category_id' => $log->category_id,
                'date' => '2024-04-12',
                'time' => $log->time,
                'end_time' => $log->end_time,
                'duration' => $this->convertTimeToSecond($log->end_time) - $this->convertTimeToSecond($log->time),
                'status' =>  $log->status,
                'platform' => 'desktop',
                'type' => 'Offline',
            ]);

            if (!$insert) {
                $this->info('Error: ' . $log->id);
            }
        }

        // $new_ids = [];
        // foreach ($tracks as $track) {
        //     $item = RunningApps::where('date', $track->datein)
        //         ->where('userid', $track->userid)
        //         ->first();

        //     if (!$item) continue;

        //     $new_ids[] = [
        //         'old' => $item->taskid,
        //         'new' => $track->id
        //     ];
        // }

        // foreach ($new_ids as $taskid) {
        //     $updated = RunningApps::where('taskid', $taskid['old'])
        //         ->update([
        //             'taskid' => $taskid['new']
        //         ]);

        //     $this->info('Updated: ' . $updated . 'TaskId: ' . $taskid['new']);
        // }



        // foreach ($apps as $app) {
        //     // $log = RunningApps::find($app->id);
        //     $app->end_time =  Carbon::parse($app->end_time)->addHours(22);
        //     $app->save();
        // }
    }
}
