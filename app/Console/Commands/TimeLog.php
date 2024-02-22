<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\RunningApps;
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
        $apps = RunningApps::where('userid', 20)
            ->where('date', '2024-02-22')
            ->whereNot('updated_at', null)
            ->get();

        foreach ($apps as $app) {
            // $log = RunningApps::find($app->id);
            $app->end_time =  Carbon::parse($app->end_time)->addHours(22);
            $app->save();
        }
    }
}
