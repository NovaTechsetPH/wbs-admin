<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Employee;

class ActiveStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'check:active-status';

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
        $this->info('Starting active status check...');
        \Log::info('Active status check started...');
        $ref = Employee::select('id','incremented')
            ->whereNot('active_status', 'Offline')
            // ->where('incremented', '>', 60)
            ->get();

        sleep(10);
        foreach ($ref as $key) {
            $current = Employee::find($key->id);

            if($key->incremented == $current->incremented) {
                \Log::info("OFFLINE: " . $current->first_name);
                $current->active_status = 'Offline';
                $current->incremented = 0;
                $current->save();
            }
        }
    }
}
