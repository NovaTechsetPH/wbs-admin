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

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $ref_date = '2024-02-28';
        $tracks = TrackRecords::whereDate('datein', '=', $ref_date)
            ->get();

        $new_ids = [];
        foreach ($tracks as $track) {
            $item = RunningApps::where('date', $track->datein)
                ->where('userid', $track->userid)
                ->first();

            if (!$item) continue;

            $new_ids[] = [
                'old' => $item->taskid,
                'new' => $track->id
            ];
        }

        foreach ($new_ids as $taskid) {
            $updated = RunningApps::where('taskid', $taskid['old'])
                ->update([
                    'taskid' => $taskid['new']
                ]);

            $this->info('Updated: ' . $updated . 'TaskId: ' . $taskid['new']);
        }



        // foreach ($apps as $app) {
        //     // $log = RunningApps::find($app->id);
        //     $app->end_time =  Carbon::parse($app->end_time)->addHours(22);
        //     $app->save();
        // }
    }
}
