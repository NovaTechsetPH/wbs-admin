<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\RunningApps;
use App\Models\TrackRecords;
use App\Models\Employee;

use Carbon\Carbon;

class DupeLogin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:dupe-login';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $employees = Employee::select('id')
            ->where('status', 'Approved')->get();

        \Log::info("STARTED SCRIPT AT: " . Carbon::now()->toDateString());
        $date_to_del = '2024-02-21';

        $apps = TrackRecords::select('id', 'userid', 'datein')
            ->whereIn('userid', $employees)
            ->whereBetween('datein', ['2024-02-19', $date_to_del])
            ->orderBy('id', 'asc')->get();


        foreach ($apps as $app) {
            if (count($app->tasks) === 0) {
                \Log::info("Total: " . json_encode($app));
            }

            // foreach($array as $value) {

            // }


            // foreach ($apps as $track) {
            //     \Log::info("Tasks: " . $track->tasks->count());

            //     if ($track->tasks->count() === 0) {
            //         if ($date_to_del === date('Y-m-d')) {
            //             sleep(5); // if current date    
            //         }

            //         // $del = $track->delete();
            //         // \Log::info("Deleted ID: " . $emp->id . " TASKID: " . $track->id . " - " . $del);
            //         \Log::info("Deleted ID: " . $emp->id . " TASKID: " . $track->id);
            //     }
            // }
        }

        // End of script
        \Log::info("ENDED SCRIPT AT: " . Carbon::now()->toDateString());
    }
}
